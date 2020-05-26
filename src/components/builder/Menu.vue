<template>
    <div class="builder__menu">
        <p>{{description}}</p>
        <ul>
            <li v-for="(item, index) in menuItems"
                :key="index"
                @click="addElement(item.element)"
                @mousedown="startDraggingElement(item)"
                @mouseup="cancelDraggingElement()">
                {{item.name}}
            </li>
            <li class="builder__menu_item builder__menu_item-save"
                @click="saveTemplate">
                {{this.saveText}}
            </li>
        </ul>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
    data() {
        return {
            saveText: 'SAVE',
            menuItems: [
                {element: 'ElementBlock', name: 'Block'}, 
                {element: 'ElementText', name: 'Text'},
                {element: 'ElementImage', name: 'Image'}
            ],
            description: 'Click on the menu item to add desired element at the end of the template or drag and drop it somewhere'
        }
    },
    computed: {
        ...mapGetters(['getElementDraggingState', 'getThreshold'])
    },
    methods: {
        addElement(element) {
            if (this.getThreshold < 2) {
                this.$store.commit('ADD_TEMPLATE_ELEMENT', {element})
            }
        },
        startDraggingElement(element) {
            this.$store.commit('SET_ELEMENT_STATE', true)
            this.$store.commit('CREATE_DRAG_ELEMENT', {dragElement: element})
            this.$store.commit('SET_THRESHOLD', {x: event.screenX, y: event.screenY})
        },
        cancelDraggingElement() {
            if (this.getElementDraggingState) {              
                this.$store.commit('REMOVE_DOM_ELEMENT')  
                this.$store.commit('SET_ELEMENT_STATE', false)
            }
        },
        saveTemplate() {
            this.saveText = 'OK';
            this.$emit('saveTemplate')
            setTimeout(() => {
                this.saveText = "SAVE";
            }, 1000)
        }
    }
}
</script>

<style lang="scss" scoped>
    .builder__menu {
        width: 30%;
        min-height: 100vh;
        height: 100%;
        box-shadow: 0 0 10px #c7c7c7;
        position: fixed;
        background: #fff;
        z-index: 1;
        left: 0;
    }
    p {        
        padding: 20px;
    }
    ul {
        margin: 0;
        padding: 0;
        li {
            list-style: none;
            cursor: pointer;
            text-align: center;
            padding: 20px;
            transition: all 0.1s;
            border: 1px solid #EAECEF;
            border-right: 0;
            margin-bottom: -1px;
            user-select: none;
            &:hover {
                background: #EAECEF;
            }
            &.builder__menu_item-save {
                background: lightgreen;
                &:hover {
                    background: #c1fdc1;
                }
            }
        }
    }
</style>