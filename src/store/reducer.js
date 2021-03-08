const initialState = {
    projects: []
}

const reducer = (state = initialState, action) => {
    
    switch(action.type){
        case 'ADD_PROJECT':
            return {
                ...state,
                projects: state.projects.concat( action.addedProject )
            }
            
        case 'DELETE_PROJECT':
            const projectsAfterDelete = state.projects.filter(project => project.Id !== action.projectId);
            return {
                ...state,
                projects: projectsAfterDelete
            }
        case 'UPDATE_PROJECT': 
            const projectsAfterUpdate = state.projects;
            state.projects.filter((project, index) => {
                if(project.Id === action.projectId){    
                    return projectsAfterUpdate.splice(index, 1, action.updatedProject)
                }
                return project;
            });
            return {
                ...state,
                projects: projectsAfterUpdate
            }
        // Timing
        case 'ADD_PROJECT_TIME':
            const projectsTimingPlus = state.projects;
            projectsTimingPlus.filter((project) => {
                if(project.Id === action.projectId){ 
                    return project.TimeModel.push(action.timeAdded);
                }
                return project;
            });
            return {
                ...state,
                projects: projectsTimingPlus
            }
        case 'DELETE_TIME':
            const projectsTimingDelete = state.projects;
            projectsTimingDelete.filter((project) => {
                for(let i = 0; i < project.TimeModel.length; i++){
                    if( project.TimeModel[i].Id === action.timeId ){
                       return project.TimeModel.splice(i, 1);
                    }
                }
                return project
            });
            
            return {
                ...state,
                projects: projectsTimingDelete
            }
        default:
            return state;
    }
};

export default reducer;