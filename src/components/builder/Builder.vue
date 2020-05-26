<template>
    <div class="builder__constructor"            
        @mouseup="addElement">
        <div class="builder__element_wrapper" 
            v-for="(element, index) in elements"
            :key="index">
            <builder-element
                :element="element"
                :elementIndex="index"/>
        </div>
    </div>
</template>

<script>
import BuilderElement from './Element';
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters(['getTemplate', 'getDragElement', 'getElementDraggingState']),
        elements() {
            return this.getTemplate;
        }
    },
    methods: {        
		addElement() {	
			if (this.getElementDraggingState) {	
				this.$store.commit('ADD_TEMPLATE_ELEMENT', {element: this.getDragElement.element})
			}
		}
    },
    components: {
        BuilderElement
    }
}
</script>

<style lang="scss">
    .builder__constructor {
        width: 70%;
        min-height: 100vh;
    }
    .builder__element {
        background:#fff;
        transition: all 0.2s;
        &-draggable {
            border: 1px dashed #ccc;
            padding: 20px;
            position: fixed;
            z-index: 10;
            background: #fff;
            width: 100px;
            transform: translate(-50px, -40px)
        }
        &:hover {
            box-shadow: inset 0 0 3px #ccc;
        }
    }
</style>