<template>
    <AddEditNote 
        v-if="storeAuth.user.isAdmin"
        v-model="new_note" 
        :bgColor='"white"'
    >
        <template #buttons>
            <button 
                :disabled='!new_note' 
                @click.prevent="addNote" 
                class="button is-rounded is-dark"
                style="border:none;"
            >
               <p class="has-text-light has-text-weight-semibold">Add a New Note</p> 
            </button>  
        </template>
    </AddEditNote>
    <progress  
        v-if="!storeNotes.notesLoaded"
        class="progress is-small" 
    />
    <template v-else>
        <section class="section ">
            <div class="container-fluid">
            <h1 class="is-size-3 has-text-weight-semibold mb-4">Notes</h1>
                <div class="columns has-background-dark-light is-flex-wrap-wrap">
                    <div 
                        v-for="note in storeNotes.notes" 
                        :key="note.id" 
                        class="column is-narrow is-3"
                    >
                        <Note :note="note" @delete="deleteNote" />
                    </div>
                </div>
            </div>
        </section>
    </template>
    <p></p>
    <div v-if="!storeNotes.notes.length && storeNotes.notesLoaded">
        <h2>There are not notes.</h2>
    </div>

    <!-- Modals -->
    <ModalDeleteNote v-if="delete_note" @yes="confirmDelete" @no="delete_note = false" />
    <Transition>
        <ModalError v-if="storeAuth.error" />
    </Transition>

    
    <Spacer size="10rem" />
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router'

import { useStoreAuth } from '@/stores/useStoreAuth';
import { useStoreNotes } from '@/stores/useStoreNotes';
import { useWatchCharacters } from '@/use/useWatchCharacters.js';

import Note from '@/components/Notes/Note.vue';
import AddEditNote from '@/components/Notes/AddEditNote.vue';
import ModalDeleteNote from '@/components/Notes/ModalDeleteNote.vue';
import ModalError from '@/components/Layout/ModalError.vue';


import Spacer from '@/components/Layout/Spacer.vue';

const storeAuth = useStoreAuth();
const router = useRouter();

const storeNotes = useStoreNotes();
const new_note = ref('');
const delete_note = ref(false);
let note_id;

onMounted(() =>{
   storeNotes.init(); 
});

function addNote() {
    storeNotes.addNotes(new_note.value);
    new_note.value = '';
};

function deleteNote(id) {
    delete_note.value = true;
    note_id = id;
};

function confirmDelete() {
    storeNotes.deleteNote(note_id);
    note_id = '';
    delete_note.value = false;
};


useWatchCharacters(new_note);


</script>