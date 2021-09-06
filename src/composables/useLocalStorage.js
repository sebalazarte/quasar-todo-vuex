import { ref, onMounted, onUnmounted, watch } from 'vue'

const useLocalStorage = (key, defaultValue) => {

    const value = ref(defaultValue);
    const read = () => {
        const v = localStorage.getItem(key);
        if(v != null) value.value = JSON.parse(v);
    }

    read();

    onMounted(() => {
        window.addEventListener('storage', read)
    });

    onUnmounted(() => {
        window.removeEventListener('storage', read);
    })

    const write = () => {
        localStorage.setItem(key, JSON.stringify(value.value));
    }

    watch([value], write, {deep: true});

    return value
}

export default useLocalStorage;