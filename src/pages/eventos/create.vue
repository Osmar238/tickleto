<template>
  <q-page class="justify-center q-pa-sm">
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">Crear Evento</div>
      </q-card-section>

      <q-form
        @submit="eventoStore.onSubmitNewEvento()"
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
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="eventoStore.eventoForm.Fecha">
                    <div class="row items-center justify-end">
                      <q-btn
                        v-close-popup
                        label="Cerrar"
                        color="primary"
                        flat
                      />
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
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-time v-model="eventoStore.eventoForm.Hora">
                    <div class="row items-center justify-end">
                      <q-btn
                        v-close-popup
                        label="Cerrar"
                        color="primary"
                        flat
                      />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions vertical align="center">
          <q-btn label="Submit" type="submit" color="primary"/>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </q-card-actions>

      </q-form>

    </q-card>
  </q-page>
</template>

<script setup>
import { useEventoStore } from '@/stores/eventoStore';

const eventoStore = useEventoStore()
</script>

<style lang="scss" scoped>

</style>
