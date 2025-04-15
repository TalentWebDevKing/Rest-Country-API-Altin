import { render, screen, fireEvent } from '@testing-library/vue'
import Home from '@/views/Home.vue'
import { vi } from 'vitest'
import { ref } from 'vue'

// Mock composable
vi.mock('@/composables/getData', () => ({
  useGetData: () => ({
    data: ref([
      {
        name: { common: 'France' },
        population: 67000000,
        region: 'Europe',
        flags: { svg: 'https://flagcdn.com/fr.svg' },
        cca3: 'FRA'
      },
      {
        name: { common: 'Brazil' },
        population: 212000000,
        region: 'Americas',
        flags: { svg: 'https://flagcdn.com/br.svg' },
        cca3: 'BRA'
      }
    ]),
    getData: vi.fn()
  })
}))

describe('Home.vue', () => {
  it('renders and filters search correctly', async () => {
    render(Home)

    // Wait for France to appear (ensures data loaded)
    expect(await screen.findByText('France')).toBeInTheDocument()
    expect(screen.getByText('Brazil')).toBeInTheDocument()

    // Filter search input
    const input = screen.getByPlaceholderText(/search/i)
    await fireEvent.update(input, 'France')

    expect(screen.getByText('France')).toBeInTheDocument()
    expect(screen.queryByText('Brazil')).not.toBeInTheDocument()
  })
})
