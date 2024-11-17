import CategoryQuery from '~/api/category/queries';
import {CategoryList} from '~/@types/category';

const name= 'category';
const Query= new CategoryQuery(name)
const queryKeys = {
  all: [name] as const,
  // list: (page: number, size?: number) => [...queryKeys.all, page, size] as const,
  list: (page: number, size?: number) => [`${name}-list`, page, size] as const,
  infiniteList: () => [`${name}-list`] as const,
  create: [`${name}-create`] as const,
  update: [`${name}-update`] as const,
  filter: (page: number, size?: number) => [`${name}-filter`, page, size] as const,
  // detail: (photoId: number) => [...queryKeys.all, photoId] as const,
  // detailComments: (photoId: number) => [...queryKeys.detail(photoId), 'comments'] as const,
  // detailComment: ({photoId, commentId}: {photoId: number, commentId: number}) => [...queryKeys.detailComments(photoId), commentId] as const,
};


const queryOptions = {
  name: name,
  update: (id) => ({
    queryKey: queryKeys.update,
    queryFn: (params)=> Query.updateCategory({params, id}),
  }),
  create: () => ({
    queryKey: queryKeys.create,
    queryFn: Query.createCategory,
  }),

  all: () => {
    return{
      queryKey: queryKeys.all,
      queryFn: Query.getCategoryAll,
    }
  },

  list: ( page: number, size?: number ) => ({
    queryKey: queryKeys.list(page, size),
    queryFn: (params)=>{
      return Query.getCategoryList({ params, page, size  })
      // return Query.filterCategoryList({ params, page, size  })
    },
  }),

  filter: ( page: number, size?: number ) => ({
    queryKey: queryKeys.filter(page, size),
    queryFn: (params)=>{
      console.log(page, size)
      return Query.filterCategoryList({ params, page, size  })
    },
  }),
  

  /* infiniteList: () => ({
    queryKey: queryKeys.infiniteList(),
    queryFn: (params)=>{
      const { pageParam }= params;
      // console.log('params', pageParam)
      return CategoryQuery.getCategoryList({ page: pageParam })
    },
  }), */

};


export default queryOptions;