import {fastapi, FastapiProps} from '~/api/api';
import {CategoryCreate, CategoryList, CategoryResponse} from '~/@types/category';
import QueryString from 'qs';

class CategoryQuery {
  name: string
  constructor(name) {
    this.name= name
  }
  getCategoryAll= async ()=> {
    const res= await fastapi({ 
      operation: 'GET', url: `/api/${this.name}/list-all`, 
      option: { 
        cache: 'no-store', 
        // next: { revalidate: 10 }
      } 
    })
    return res as CategoryResponse;
  }

  filterCategoryList= async ({ params, page, size })=> {
    // console.log(params)
    const { data, access_token }= params;
    const pg= params?.page ?? (page ?? 1);
    const sz= params?.size ?? (size ?? '');
    const res= await fastapi<CategoryList>({ 
      operation: 'POST', 
      url: `/api/${this.name}/list`, 
      params: { page:pg , size:sz, filter: JSON.stringify(data) },
      access_token,
      option: { 
        cache: 'no-store', 
        // next: { revalidate: 10 }
      } 
    })
    return res?.data as CategoryList
  }

  getCategoryList= async ({ params, page, size })=> {
    // console.log('cate list ', `/api/${this.name}/list-all`)
    // console.log('get datas Client')
    const res= await fastapi<CategoryList>({ 
      operation: 'GET', url: `/api/${this.name}/list`, 
      // operation: 'GET', url: `/user/test`, 
      params: { page : page ?? 1, size: size ?? '' },
      option: { 
        cache: 'no-store', 
        // next: { revalidate: 10 }
      } 
    })
    // console.log('res:', res)
    return res?.data as CategoryList;
  }

   createCategory= async (params)=> {
    const { data, access_token }= params;
    const option: FastapiProps= { 
      operation: 'POST', 
      url: `/api/${this.name}/create`, 
      access_token,
      params: data
    }
    const res= await fastapi<CategoryCreate>(option)
    return res?.data as CategoryCreate;
  }

  updateCategory= async ({params, id})=> {
    // console.log(params, id)
    const { data, access_token }= params
    // return
    const option: FastapiProps= { 
      operation: 'PUT', 
      url: `/api/${this.name}/update/${id}`, 
      params: data,
      access_token,
      option: { 
        cache: 'no-store', 
        // next: { revalidate: 10 }
      } 
    }
    const res= await fastapi<CategoryCreate>(option)
    return res?.data as CategoryCreate;
  }

  /* async getCategoryList({ page }) {
    // console.log('get datas Client page', page)
    const option: FastapiProps= { 
      operation: 'GET', url: '/api/question/list-next', 
      params: { page : page ?? 1 },
      option: { 
        // cache: 'force-cache'
        // cache: 'no-store', 
        // next: { revalidate: 10 }
      } 
    }
    if( page ) option.params= { page }
    const res: CategoryList= await fastapi(option)
    return {...res, 
      // nextCursor: page+1
    } as CategoryListInfinite;
  } */

}


export default CategoryQuery