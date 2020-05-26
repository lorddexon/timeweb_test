<template>
    <div class="builder">
        <Menu @saveTemplate="saveTemplate"/>
        <Builder/>
    </div>
</template>

<script>
import Builder from './builder/Builder';
import Menu from './builder/Menu';
import { mapGetters } from 'vuex'
export default {
    components: {
        Builder,
        Menu
    },
    computed: {
        ...mapGetters(['getTemplate'])
    },
    methods: {
        saveTemplate() {
            window.localStorage.setItem('template', JSON.stringify(this.getTemplate));
        }
    }
}
</script>

<style lang="scss">
    .builder {
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
    }
</style>