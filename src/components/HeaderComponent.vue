<script setup>
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)

</script>
<template>
    <header class="Header" ref="Header">
        <div>
            <h1 class="Header__title">Where in the world?</h1>

            <button class="Header__theme" @click="toggleDark()">
                <i class="fa-regular fa-moon" v-if="isDark === false"></i>
                
                <i class="fa-solid fa-moon" v-else></i>
                <p>Dark Mode</p>
            </button>
        </div>

    </header>
</template>
<style scoped lang="scss">
.Header {
    box-shadow: 0 0 5px rgba(128, 128, 128, 0.473);
    display: flex;
    justify-content: center;
    padding: 2rem 0;
    align-items: center;

    & div {
        width: 90%;
        display: flex;
        justify-content: space-between;
    }

    &__theme {
        color: inherit;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: transparent;
        border: none;
        cursor: pointer;

        p {
            font-family: inherit;
            font-size: clamp(.7rem, 2vw, 1rem);
            font-weight: 600;
        }
    }

    &__title {
        font-size: clamp(1.2rem, 3vw, 2rem);
    }
}

.fa-regular, .fa-solid {
    font-size: clamp(1rem, 2vw, 1.5rem);
    margin-right: .5rem;
}
</style>