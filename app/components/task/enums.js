export const priorityTypes= [
    {label:'Низкий', strValue:'LOW', value: '0'},
    {label:'Незначительный', strValue:'MINOR', value: '1'},
    {label:'Средний', strValue:'NORMAl', value: '2'},
    {label:'Высокий', strValue:'MAJOR', value: '3'},
    {label:'Блокирующий', strValue:'BLOCKER', value: '4'},
];

export const taskLevels= [
    {label:'Epic', strValue:'EPIC', value: '0'}, 
    {label:'Story', strValue:'USER_STORY', value: '1'}, 
    {label:'Task', strValue:'TASK', value: '2'}, 
];

export const taskTypes= [
    {label:'Разработка', strValue:'DEVELOPMENT', value: '0'},
    {label:'Баг', strValue:'BUG', value: '1'},
    {label:'Косметические исправления', strValue:'COSMETICS', value: '2'},
    {label:'Не требует исправления', strValue:'WONTFIX', value: '3'},
    {label:'Предложение', strValue:'ASSUMPTION', value: '4'},
];