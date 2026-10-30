<template>
  <q-page class="justify-center q-pa-sm">
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">Editar Evento</div>
      </q-card-section>

      <!-- CAMBIO IMPORTANTE AQUÍ: Se usa onSubmitEditEvento() en lugar de onSubmitNewEvento() -->
      <q-form
        @submit="eventoStore.onSubmitEditEvento()"
        @reset="eventoStore.onReset()"
        class="q-gutter-md"
      >
        <q-card-section>
          <q-input v-model="eventoStore.eventoForm.Nombre" label="Nombre" outlined type="text"/>

          <q-input v-model="eventoStore.eventoForm.Descripcion" type="textarea" label="Descripción" outlined rows="3"/>

          <q-input v-model="eventoStore.eventoForm.Ubicacion" label="Ubicación" outlined type="text"/>

          <!-- FECHA -->
          <q-input
            v-model="eventoStore.eventoForm.Fecha"
            label="Fecha"
            outlined
            readonly
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="eventoStore.eventoForm.Fecha">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Cerrar" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <!-- HORA -->
          <q-input
            v-model="eventoStore.eventoForm.Hora"
            label="Hora"
            outlined
            readonly
          >
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-time v-model="eventoStore.eventoForm.Hora">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Cerrar" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions vertical align="center">
          <!-- Opcional: Cambiar el texto del botón a "Actualizar" o "Guardar Cambios" -->
          <q-btn label="Actualizar" type="submit" color="primary"/>
          <q-btn label="Cancelar" to="/eventos" color="primary" flat class="q-ml-sm" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup>
import { useEventoStore } from '@/stores/eventoStore';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const eventoStore = useEventoStore()
const route = useRoute()

onMounted(() => {
  // Llama a la función del store para cargar los datos del evento a editar
  // usando el ID que viene en la ruta (URL)
  eventoStore.getEventoByID(route.params.id)
})
</script>

<style lang="scss" scoped>
</style>
