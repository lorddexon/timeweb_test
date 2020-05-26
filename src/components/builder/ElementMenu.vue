<template>
    <div class="element__menu"
        :class="{'element__menu-visible': isMenuVisible}">
        <ul>
            <li @click="removeElement">Remove</li>
            <li @click="moveElement(-1)">Move up</li>
            <li @click="moveElement(1)">Move down</li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ['element', 'elementIndex', 'isMenuVisible'],
    methods: {
        removeElement() {
            this.$store.commit('REMOVE_TEMPLATE_ELEMENT', {index: this.elementIndex})
        },
        moveElement(position) {            
            this.$store.commit('MOVE_TEMPLATE_ELEMENT', {
                element: this.element,
                index: this.elementIndex,
                position: this.elementIndex + position
            })
        },   
    }
}
</script>

<style lang="scss" scoped>
    .element__menu {
        position: absolute;
        top: 5px;
        right: 0;
        background:rgba(255,255,255,0.5);
        visibility: hidden;
        opacity: 0;
        transition: all 0.1s;
        &-visible {
            opacity: 1;
            visibility: visible;
        }
    }
    ul {
        display: flex;
        margin: 0;
        padding: 0;
        flex-direction: row;
            padding: 10px 0;
        li {
            list-style: none;
            font-size: 12px;
            margin: 0 10px;
            cursor: pointer;
            border-bottom: 1px dashed;
            user-select: none;
            &:hover {
                border-bottom: 1px solid transparent;
            }
        }
    }
</style>