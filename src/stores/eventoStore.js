import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/boot/supabase'
import { useRouter } from 'vue-router'

export const useEventoStore = defineStore('eventoStore', () => {
  const router = useRouter()
  // STATE
  const eventos = ref([])
  const eventoFormBase = {
    Nombre: "",
    Descripcion: "",
    Ubicacion: "",
    Fecha: "",
    Hora: ""
  }
  const eventoForm = ref(Object.assign({}, eventoFormBase))

  // ACTIONS
  async function getEventos() {
    const { data, error } = await supabase
      .from('Eventos')
      .select()
    if (error) {
      console.error(error)
      return
    }
    eventos.value = data
  }

  async function getEventoByID(id) {
    const { data, error } = await supabase
      .from('Eventos')
      .select()
      .eq("UniqueID", id)
    if (error) {
      console.error(error)
      return
    }
    eventoForm.value = Object.assign({}, data[0])
  }

  async function onSubmitNewEvento() {
    const { error } = await supabase
      .from("Eventos")
      .insert([
        eventoForm.value
      ]).select()
    if (error) {
      console.error(error)
      return
    }
    onReset()
    router.push("/eventos")
  }

  async function onSubmitEditEvento() {
    const { error } = await supabase
      .from("Eventos")
      .update(eventoForm.value)
      .eq("UniqueID", eventoForm.value.UniqueID)
      .select()
    if (error) {
      console.error(error)
      return
    }
    onReset()
    router.push("/eventos")
  }

  function onReset() {
    eventoForm.value = Object.assign({}, eventoFormBase)
  }

  async function deleteEvento() {
    const { error } = await supabase
      .from('Eventos')
      .delete()
      .eq("UniqueID", eventoForm.value.UniqueID)
    if (error == null) {
      eventos.value = eventos.value.filter((v) => v.UniqueID != eventoForm.value.UniqueID)
      eventoForm.value = Object.assign({}, eventoFormBase)
      router.push("/eventos")
    }
  }

  // RETURN
  return {
    eventos,
    eventoForm,
    getEventos,
    getEventoByID,
    onSubmitNewEvento,
    onSubmitEditEvento,
    onReset,
    deleteEvento
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useEventoStore, import.meta.hot))
}
