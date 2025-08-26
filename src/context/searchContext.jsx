import { createContext, useContext,useState} from "react";

 
 const SearchContext = createContext();

 export function SearchProvider ({children}){
    const [searchText,setSearchText] = useState('');
    return (
        <SearchContext.Provider value={{searchText, setSearchText}} >
            {children}
        </SearchContext.Provider> 
    )
 }

 export const useSearch = ()=>{
    const context = useContext(SearchContext);
    if(!context) throw new Error("Context for Seach is not set")
    return context;
 }