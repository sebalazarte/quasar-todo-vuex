<template>
	<q-layout view="lHh Lpr lFf">
		<q-header>
			<q-toolbar>
				<q-btn
					flat
					dense
					round
					icon="menu"
					aria-label="Menu"
					@click="toggleLeftDrawer"
				/>
			</q-toolbar>

			<div class="q-px-lg q-pt-xl q-mb-md">
				<div class="text-h3">Todo</div>
				<div class="text-subtitle1">{{ todayDate }}</div>
			</div>
			<q-img
				src="../statics/mountains.jpg"
				class="header-image absolute-top"
			/>
		</q-header>

		<q-drawer
			v-model="leftDrawerOpen"
			show-if-above
			:width="250"
			:breakpoint="600"
		>
			<q-scroll-area
				style="
					height: calc(100% - 192px);
					margin-top: 192px;
					border-right: 1px solid #ddd;
				"
			>
				<q-list padding>
					<q-item 
					to="/">
						<q-item-section avatar>
							<q-icon name="list" />
						</q-item-section>

						<q-item-section> {{$t('todo')}} </q-item-section>
					</q-item>

					<q-item 
					to="/help"
					exact>
						<q-item-section avatar>
							<q-icon name="help" />
						</q-item-section>

						<q-item-section> {{$t('help')}} </q-item-section>
					</q-item>
						
					<q-item>
						<q-item-section avatar>
							<q-icon name="language" />
						</q-item-section>
						<q-item-section avatar>
							<q-select
								v-model="locale"
								:options="localeOptions"
								label="Idioma"
								dense
								borderless
								emit-value
								map-options
								options-dense
								style="min-width: 150px"
							/>
						</q-item-section>
					</q-item>
				</q-list>
			</q-scroll-area>

			<q-img
				class="absolute-top"
				src="../statics/mountains.jpg"
				style="height: 192px"
			>
				<div class="absolute-bottom bg-transparent">
					<q-avatar size="56px" class="q-mb-sm">
						<img src="../statics/seba.jpg" />
					</q-avatar>
					<div class="text-weight-bold">Seba Lazarte</div>
					<div>@sebalazarte</div>
				</div>
			</q-img>
		</q-drawer>

		<q-page-container>
			<keep-alive>
				<router-view />
			</keep-alive>
			<q-page-sticky position="bottom-right" :offset="[40, 30]">
            <q-fab
              icon="language"
              direction="up"
              color="primary"
            >
              <q-fab-action
			  	icon="translate"
                color="positive"
                label="English"
                @click="setLanguage('en-Us')" />
              <q-fab-action
			  	icon="translate"
                color="negative"
                label="Spanish"
                @click="setLanguage('es-AR')" />
            </q-fab>
          </q-page-sticky>
		</q-page-container>
	</q-layout>
</template>

<script>
	import { useI18n } from 'vue-i18n'
	import { defineComponent, ref, computed } from "vue";
	import { date } from "quasar";

	export default defineComponent({
		name: "MainLayout",

		components: {
		},

		setup() {
			const leftDrawerOpen = ref(false);
		    const { locale } = useI18n({ useScope: 'global' })


			return {
				leftDrawerOpen,
				toggleLeftDrawer() {
					leftDrawerOpen.value = !leftDrawerOpen.value;
				},
				todayDate: computed(() => {
					const timeStamp = Date.now();
					return date.formatDate(timeStamp, "dddd D MMMM");
				}),
				locale,
				localeOptions: [
					{ value: 'en-US', label: 'English' },
					{ value: 'es-AR', label: 'Español' }
				],
				setLanguage: (lan) => {
					locale.value = lan
				}
			};
		},
	});
</script>

<style lang="scss" scoped>
.header-image {
	height: 100%;
	z-index: -1;
	opacity: 0.2;
	filter: grayscale(100%);
}
</style>
