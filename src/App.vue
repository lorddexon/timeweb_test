<template>
	<div id="app"
		:class="{'interactive': getElementDraggingState}"
        @mousemove="dragElement"
		@mouseup="stopDraggingElement">
		<Main/>
	</div>
</template>

<script>
import Main from './components/Main';
import {mapGetters} from 'vuex';
export default {
	name: 'App',
	components: {
		Main
	},
	computed: {
		...mapGetters(['getElementDraggingState', 'getDragElement'])
	},
    methods: {
        dragElement() {
            this.$store.commit('UPDATE_THRESHOLD', {x: event.screenX, y: event.screenY})
		},
		stopDraggingElement() {			
			if (this.getElementDraggingState) {	
                this.$store.commit('SET_ELEMENT_STATE', false)
				this.$store.commit('REMOVE_DOM_ELEMENT')
			}
		}
	}
}
</script>

<style lang="scss">
    * {
		box-sizing: border-box;
	}
	body {
		margin: 0;
		padding: 0;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}
	#app {
		min-height: 100vh;
		&.interactive {
			cursor: grab;
		}
	}
</style>