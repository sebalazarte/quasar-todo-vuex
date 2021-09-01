<template>
	<q-page class="bg-grey-3 column">
		<div class="row q-pa-sm bg-primary">
			<q-input
				ref="txtInput"
				v-model="newTask"
				@keyup.enter="addTask"
				class="col"
				square
				filled
				bg-color="white"
				:placeholder="$t('addTodo')"
				dense
				:rules="[(val) => !!val || 'campo requerido']"
			>
				<template v-slot:append>
					<q-btn @click="addTask" round dense flat icon="add" />
				</template>
			</q-input>
		</div>
		<q-list class="bg-white" separator bordered>
			<q-item
				v-for="(task, index) in tasks"
				:key="task.title"
				@click="task.done = !task.done"
				v-ripple
				clickable
				:class="{ 'done bg-blue-1': task.done }"
			>
				<q-item-section avatar>
					<q-checkbox
						v-model="task.done"
						color="primary"
						class="no-pointer-events"
					/>
				</q-item-section>
				<q-item-section>
					<q-item-label>{{ task.title }}</q-item-label>
				</q-item-section>
				<q-item-section v-if="task.done" side>
					<q-btn
						@click.stop="deleteTask(index)"
						flat
						round
						color="primary"
						icon="delete"
						dense
					/>
				</q-item-section>
			</q-item>
		</q-list>
		<div class="no-tasks absolute-center" v-if="!tasks.length">
			<q-icon name="check" size="100px" color="primary" />
			<div class="text-h5 text-primary text-center">{{ $t('noEntries') }}</div>
		</div>
	</q-page>
</template>

<script>
	import { defineComponent, ref } from "vue";
	import { useQuasar } from "quasar";

	export default defineComponent({
		name: "Todo",

		setup() {
			const $q = useQuasar();

			const newTask = ref("");
			const tasks = ref([]);
			const txtInput = ref(null);

			return {
				txtInput,
				tasks,
				newTask,
				deleteTask: (index) => {
					$q.dialog({
						title: "Confirmar",
						message: "Esta seguro que desea borrar la tarea?",
						cancel: true,
						persistent: true,
					}).onOk(() => {
						tasks.value.splice(index, 1);
						$q.notify({
							icon: "warning",
							color: "red",
							message: "Tarea eliminada",
						});
					});
				},
				addTask: () => {

					txtInput.value.validate();
					if(txtInput.value.hasError){
						return $q.notify({
							icon: 'error',
							message: 'Verifique los datos ingresados',
							color: 'warning'
						})
					}
					
					txtInput.value.resetValidation();
					tasks.value.push({
						title: newTask.value,
						done: false,
					});
					newTask.value = "";
					
				},
			};
		},
	});
</script>

<style lang="scss" scoped>
.done {
	.q-item__label {
		text-decoration: line-through;
		color: #bbb;
	}
}

.no-tasks {
	opacity: 0.5;
}
</style>