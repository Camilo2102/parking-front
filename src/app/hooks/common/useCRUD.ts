import * as Routes from "../../constants/routesContsants"
import {Paginator} from "../../interfaces/model"
import useHttpPettions from "./useHttpPetitions";

export default function useCRUD<T>(baseUrl: string, secure: boolean = false){

    baseUrl = `api/${baseUrl}`;

    const {httpGet, httpPost, httpPut, httpDelete} = useHttpPettions();

    /**
     * Obtiene la peticion para traer todos los elementos de un objeto T
     * @param filter
     * @returns la peticion lista que trae los objetos de un elemento T
     */
    const getAll = (filter: T): Promise<T[]> => {
        const petitioRoute: string = baseUrl + Routes.GET_ALL_BY_FILTER;
        return httpPost(petitioRoute, secure, [filter]);
    }

    /**
     * Obtiene la peticion para traer la cantidad de elementos de un objeto T
     * @param baseUrl la url basica para hacer la peticion
     * @returns la peticion lista para obtener la cantidad de registros
     */
    const getAllCount = (): Promise<T> => {
        const petitioRoute: string = baseUrl + Routes.GET_ALL_COUNT_ROUTE;
        return httpGet(petitioRoute, secure);
    }

    /**
     * Obtiene la peticion para traer todos los elementos de un objeto T, teniendo en cuenta un paginador
     * @param baseUrl la url basica para hacer la peticion
     * @param page indica la pagina que se va a obtener
     * @param pageSize el tamaño de los elementos
     * @returns la peticion lista para traer los elemtnos T paginados
     */
    const getAllByPage = (
        secure: boolean = true,
        page: number = 0,
        pageSize: number = 10
    ): Promise<T[]> => {
        const petitioRoute: string =
            baseUrl +
            Routes.GET_ALL_BY_PAGE_ROUTE +
            `?pageNumber=${page}&pageSize=${pageSize}`;
        return httpGet(petitioRoute, secure);
    }

    /**
     * Este metodo se encarga de obtener los valores que cumplan con los filtros ingresados
     * @param page indica la pagina que se va a obtener
     * @param pageSize el tamaño de los elementos
     * @param t El objeto a filtrar
     * @returns  la lista de objetos filtrados
     */
    const getAllByFilter = (paginator: Paginator, t: any): Promise<T[]> => {
        const petitioRoute: string = baseUrl + Routes.GET_ALL_BY_FILTER_PAGED + `?pageNumber=${paginator.page}&pageSize=${paginator.rows}`;
        return httpPost(petitioRoute, secure, [t]);
    }

    //  todo    
    const countAllByFilter = (t: any): Promise<number> => {
        const petitioRoute: string = baseUrl + Routes.COUNT_ALL_BY_FILTERS;
        return httpPost(petitioRoute, secure, [t]);
    }

    /**
     * Obtiene la peticion para crear un registro de tipo T
     * @param baseUrl la url basica para hacer la peticion
     * @param body el objeto que se va a enviar en la peticion de tipo T
     * @returns el objeto creado
     */
    const create = ( body: T): Promise<T> => {
        const petitioRoute: string = baseUrl + Routes.CREATE_ROUTE;
        return httpPost(petitioRoute, secure, [body]);
    }

    /**
     * Obtiene la peticion para actualizar un registro de tipo T
     * @param baseUrl la url basica para hacer la peticion
     * @param body el objeto a actualizar, importante que tenga el id, en caso contrario falla
     * @returns la peticion con el objeto actualizado
     */
    const update = ( body: T): Promise<T> => {
        const petitioRoute: string = baseUrl + Routes.UPDATE_ROUTE;
        return httpPut(petitioRoute, secure, [body]);
    }

    /**
     * Se elimina un registro por id
     * @param baseUrl la url basica para hacer la peticion
     * @param id el id del elemento a eliminar
     * @returns el estado de la operacion
     */
    const deleteData = ( id: string): Promise<any> => {
        const petitioRoute: string = baseUrl + Routes.DELETE_ROUTE + `?id=${id}`;
        return httpDelete(petitioRoute, secure);
    }

    const createAll = (body: T[]): Promise<any> =>{
        const petitioRoute: string = baseUrl + Routes.CREATE_ALL_ROUTE;
        return httpPost(petitioRoute, secure, body);
    }

    const deleteAll = ( id: string): Promise<any> =>{
        const petitioRoute: string = baseUrl + Routes.DELETEALL_ROUTE  + `?id=${id}`;
        return httpDelete(petitioRoute, secure);
    }

    const getById = ( id: string): Promise<any> => {
        const petitioRoute: string = baseUrl + Routes.GET_BY_ID_ROUTE + `?id=${id}`;
        return httpGet(petitioRoute, secure);
    }


    return {
        getAll,
        getAllCount,
        getAllByPage,
        getAllByFilter,
        countAllByFilter,
        create,
        update,
        deleteData,
        createAll,
        getById,
        deleteAll
    };
}