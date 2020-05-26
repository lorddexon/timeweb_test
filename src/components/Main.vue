<template>
    <div class="builder">
        <Menu/>
        <Builder/>
    </div>
</template>

<script>
import Builder from './builder/Builder';
import Menu from './builder/Menu';
export default {
    components: {
        Builder,
        Menu
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