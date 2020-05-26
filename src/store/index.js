import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        template: [],
        startPoint: {x: null, y: null},
        currentPoint: {x: null, y: null},
        dragElement: null,
        DOMElement: null,
        isElementDragging: false,
        threshold: 0
    },
    getters: {
        getTemplate: state => {
            return state.template
        },
        getDragElement: state => {
            return state.dragElement
        },
        getThreshold: state => {
            return state.threshold
        },
        getElementDraggingState: state => {
            return state.isElementDragging
        }
    },
    mutations: {
        // clicking on menu items over the element
        ADD_TEMPLATE_ELEMENT(state, {element, position}) {
            state.template.push(element)
            if (position !== undefined) {        
                state.template.splice(state.template.length - 1, 1)
                state.template.splice(position, 0, element)
            }
        },
        REMOVE_TEMPLATE_ELEMENT(state, {index}) {
            state.template.splice(index, 1)
        },
        MOVE_TEMPLATE_ELEMENT(state, {element, index, position}) {
            state.template.splice(index, 1)
            state.template.splice(position, 0, element)
        },

        // grabbing / release items of left menu
        REMOVE_DOM_ELEMENT(state) {
            state.DOMElement.parentNode.removeChild(state.DOMElement)            
            state.DOMElement = null
            state.dragElement = null
        },
        SET_ELEMENT_STATE(state, elementState) {
            state.isElementDragging = elementState
        },
        CREATE_DRAG_ELEMENT(state, {dragElement}) {
            const draggableElement = document.createElement("div")
            draggableElement.className = "builder__element-draggable"
            document.body.appendChild(draggableElement)
            state.DOMElement = document.querySelector(".builder__element-draggable")
            state.dragElement = dragElement
        },

        // dragging of menu item to calculate threshold
        SET_THRESHOLD(state, {x, y}) {
            state.threshold = 0
            state.startPoint.x = x
            state.startPoint.y = y
        },
        UPDATE_THRESHOLD(state, {x, y}) {
            if (!state.isElementDragging) {
                return false;
            }
            state.currentPoint.x = x
            state.currentPoint.y = y
            state.threshold = Math.sqrt(Math.pow((state.currentPoint.x - state.startPoint.x), 2) + Math.pow((state.currentPoint.y - state.startPoint.y), 2))
            // two pixels - random number of threshold
            if (state.threshold > 2) {
                state.DOMElement.style.left = `${x}px`
                state.DOMElement.style.top = `${y}px`
            }
        }
    }
})