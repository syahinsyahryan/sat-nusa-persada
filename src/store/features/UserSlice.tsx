import { ToDo, User } from "@/utils/interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ToDoState{
    toDos: ToDo[];
}

const initialState: ToDoState={
    toDos:[],
};

export const TodoSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        addUser: (state,action:PayloadAction<{name:string}>)=>{
            state.toDos.push({
                id: state.toDos.length, 
                title: action.payload,
                completed: 
            });
        },
    },
})