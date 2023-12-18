import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { FormElement, ActiveElementId, NewFormElement } from '@/types/FormCreator';
import { nanoid } from 'nanoid';
import { RootState } from '@/redux/store';

interface FormCreatorState {
    formElements: FormElement[];
    activeElementId: ActiveElementId|null;
}

const initialState: FormCreatorState = {
    formElements: [],
    activeElementId: null,
};

export const formCreatorSlice = createSlice({
  name: 'formCreator',
  initialState,
  reducers: {
    addFormElement: (state, { payload }: PayloadAction<NewFormElement>) => {
        const id = nanoid();
        state.formElements = [...state.formElements, { ...payload, id }];
    },
    deleteFormElement: (state, { payload }: PayloadAction<{ id: string }>) => {
        const newElements = state.formElements.filter((element) => element.id !== payload.id);
        state.formElements = newElements.map((element, index) => ({ ...element, indexPosition: index }));
        
    },
    activateElement: (state, { payload }: PayloadAction<{ id: string }>) => {
        state.activeElementId = payload.id;
    },
    removeActiveElement: (state) => {
        state.activeElementId = null;
    },
  },
  
});

export const { addFormElement, deleteFormElement, activateElement, removeActiveElement } = formCreatorSlice.actions;
export const formElementsCount = (state: RootState) => state.formCreator.formElements.length;
export const activeFormElement = (state: RootState) => state.formCreator.formElements.find((element) => element.id === state.formCreator.activeElementId);
export default formCreatorSlice.reducer;