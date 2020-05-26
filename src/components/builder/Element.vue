<template>
    <div class="builder__element"
        @mouseenter="isOverElement = true"
        @mouseleave="isOverElement = false"
        @mouseup="addElement">
        <component :is="element"/>
        <element-menu
            :element="element"
            :elementIndex="elementIndex"
            :isMenuVisible="isOverElement"/>
    </div>
</template>

<script>
import ElementBlock from '../elements/Block';
import ElementText from '../elements/Text';
import ElementImage from '../elements/Image';
import ElementMenu from './ElementMenu';
import {mapGetters} from 'vuex';

export default {
    data() {
        return {
            isNewElement: true,
            isOverElement: false
        }
    },
    props: ['element', 'elementIndex'],
    components: {
        ElementBlock,
        ElementText,
        ElementImage,
        ElementMenu
    },
    computed: {
        ...mapGetters(['getElementDraggingState', 'getDragElement'])
    },
    methods: {
        addElement() {
            if (this.getElementDraggingState) {
                this.$store.commit('ADD_TEMPLATE_ELEMENT', {
                    element: this.getDragElement.element,
                    position: this.elementIndex
                })                
                this.$store.commit('SET_ELEMENT_STATE', false)                
                this.$store.commit('REMOVE_DOM_ELEMENT')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .builder__element {
        position: relative;
    }
</style>