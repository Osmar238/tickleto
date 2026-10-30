<template>
  <q-page class="justify-center">
    <q-card class="my-card">
      <q-card-section class="row">
        <div class="text-h6">Lista de Eventos</div>
        <q-space />
        <q-btn color="positive" icon="add" label="Agregar" to="/eventos/create" />
      </q-card-section>

      <q-card-section>
        <q-table
          :rows="eventoStore.eventos"
          :columns="columns"
          row-key="name"
        >
          <template v-slot:body-cell-acciones="props">
            <q-td key="acciones" :props="props">
              <q-btn-group flat>
                <q-btn color="primary" icon="edit" dense flat :to="'/eventos/edit_' + props.row.UniqueID"/>
                <q-btn color="negative" icon="delete" dense flat @click="setDelete(props.row)"/>
              </q-btn-group>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center bg-red">
          <q-avatar icon="warning" color="negative" text-color="white" />
          <span class="q-ml-sm">¡Alerta! Eliminar <q-chip square :label="deleteItem" /></span>
        </q-card-section>

        <q-card-section>
          Para eliminar el registro favor de ingresar
          <q-chip square :label="deleteCode" />
          para confirmar.
        </q-card-section>

        <q-card-section>
          <q-input v-model="validateCode" type="text" label="" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn
            :disable="validateCode != deleteCode"
            label="Eliminar"
            color="negative"
            @click="eventoStore.deleteEvento"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useEventoStore } from '@/stores/eventoStore';

const eventoStore = useEventoStore()

onMounted(() => {
  eventoStore.getEventos()
})

const columns = [
  {
    name: "UniqueID",
    label: "ID",
    field: (row) => row.UniqueID,
    required: true,
    align: "left",
    format: (val) => `${val}`,
    sortable: true
  },
  {
    name: "Nombre",
    label: "Nombre",
    field: (row) => row.Nombre,
    required: true,
    align: "left",
    format: (val) => `${val}`,
    sortable: true
  },
  {
    name: "Descripcion",
    label: "Descripcion",
    field: (row) => row.Descripcion,
    required: false,
    align: "left",
    format: (val) => `${val}`,
    sortable: false
  },
  {
    name: "Ubicacion",
    label: "Ubicacion",
    field: (row) => row.Ubicacion,
    required: false,
    align: "left",
    format: (val) => `${val}`,
    sortable: true
  },
  {
    name: "Fecha",
    label: "Fecha",
    field: (row) => row.Fecha,
    required: true,
    align: "left",
    format: (val) => `${val}`,
    sortable: true
  },
  {
    name: "Hora",
    label: "Hora",
    field: (row) => row.Hora,
    required: true,
    align: "left",
    format: (val) => `${val}`,
    sortable: false
  },
  {
    name: "acciones",
    label: "Acciones",
    align: "center",
    sortable: false
  }
]

const deleteItem = ref("")
const deleteCode = ref("")
const validateCode = ref("")
const confirm = ref(false)

function setDelete(evento) {
  deleteItem.value = evento.Nombre
  deleteCode.value = evento.Nombre
  confirm.value = true
  eventoStore.eventoForm = Object.assign({}, evento)
}
</script>

<style scoped>
</style>
