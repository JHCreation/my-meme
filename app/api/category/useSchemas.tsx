'use client'
import * as React from 'react';
// import CheckboxInput from '@/src/components/_forms/input/CheckboxInput';
import TextInput from '@/components/inputs/TextInput';
import DynamicTextInput from '@/components/inputs/DynamicTextInput';
// import DynamicTextInput from '@/src/components/_forms/input/DynamicTextInput';
// import FileInput from '@/src/components/_forms/input/FileInput';
// import EditorInput from '@/src/components/_forms/input/EditorInput';
// import SelectInput from '@/src/components/_forms/input/SelectInput';
import _ from 'lodash';

// import { CommContext, AppContext } from '@/src_admin/components/_context';
import guidQ1 from '@/utils/validate/guid';
import { SchemParamProps, SchemProps, ValidateCheckStatus, ValidateMsgProps} from '@/@types/dataSchemas';
import { phoneCheck, replacePhone, phoneAutoHyphen, emailCheck } from '@/utils/validate/check-validate';
import { CustomCellRendererProps } from 'ag-grid-react';
// import useSchemasCountry from './useSchemasCountry'
import { ValueFormatterParams, ValueParserLiteParams } from 'ag-grid-community';
import { parseISO, format } from 'date-fns';
import { Button } from '@mui/material';
import FileInput from '@/components/inputs/FileInput';
import FileList from '@/components/inputs/FileList';
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { categorySelector } from "@/recoil/selectors/common";
import { categoryState } from "@/recoil/atoms/common";

const { useState, useEffect, useContext }= React;

type Props= {
  data?: any
  keyname?: string
  option?: object
}
export default function useSchemas ({ keyname, option }: Props) {
  const category= useRecoilValueLoadable(categorySelector)
  const [schema, setSchema]= useState<any>(null);
  const init= ()=> {
    const schm= getDefaultSchema({ keyname, category, option })
    setSchema(schm);
  }
  
  React.useMemo(()=> {
    if( category.state == 'hasValue' ){
      init()
    }
  }, [category])
  
  /* useEffect(() => {
    init()
  }, []); */

  return {schema, setSchema, getDefaultSchema, init, category};
}



export const getDefaultSchema= ({ keyname, category, option }: SchemParamProps)=> {
  // console.log(option)
  const publicCategory= category.contents['status'].value
  // console.log(publicCategory)
  const defaultValue:SchemProps= {
    [`id`]: {
      key: `id`,
      name: '아이디',
      value: guidQ1(),
      validate: [ { value: 'pass', } ],
      disabled: true,
      disableFilter: true,
      // component: <TextInput />,
      order: 0,
      update: {
        component: <TextInput />
      }
    },
    [`key`]: {
      key: `key`,
      name: '키',
      value: '',
      // disabled: true,
      required: true,
      validate: [
        { value: 'empty', }
      ],
      helperText: true,
      disableFilter: true,
      component: <TextInput />,
      order: 0,
      column: {
        props: {
          width: 150,
          // checkboxSelection: true
          cellEditor: "agSelectCellEditor",
          cellEditorParams: {
            values: [],
          },
        }
      },
      update: {
        disabled: true,
      }
    },
    // [`${name}_country`]: useSchemasCountry({ name, countries: countryInfo?.data, countriesByCode: countryInfoByCode }),
    
    [`name`]: {
      key: `name`,
      name: '이름',
      value: '',
      validate: [
        { value: 'empty' }
      ],
      // maxLen: 100,
      // required: true,
      helperText: true,
      component: <TextInput/>,
      order: 0,
      column: { 
        type: 'text', 
        props: { 
          width: 50,
          editable: true,
          filter: true
        } 
      },
    },

    [`value`]: {
      key: `value`,
      name: '값',
      value: [],
      // disabled: true,
      validate: [
        { 
          check: ({ value, schema, wholeSchema })=> {
            console.log(value)
            let status: ValidateCheckStatus= true;
            status= value.length == 0 ? 'empty' : true;
            value.map(val=> {
              if(val['key'] == '')  status= null
              if(val['value'] == '')  status= null
            })
            return { value, status }
          },
          value: 'empty', 
        },
        
      ],
      // maxLen: 100,
      required: true,
      helperText: true,
      component: <DynamicTextInput items={[{key: 'key', name: '키'}, {key: 'value', name: '값'}]}/>,
      order: 0,
      // notice: <div className="text-amber-700">test</div>,
      column: { 
        type: 'text', 
        props: { 
          width: 200, 
          editable: false,
          valueParser: (params: ValueParserLiteParams<any, string>) => {
            return `${params.newValue}`
          },
          valueFormatter: (params: ValueFormatterParams) => { 
            return `${params.value}` 
          },
        } 
      }
    },


    [`status`]: {
      key: `status`,
      name: '상태',
      type: 'check',
      value: '',
      validate: [
        { value: 'empty', }
      ],
      range: category['public'],
      required: true,
      helperText: true,
      component: <TextInput />,
      order: 0,
      column: { props: { width: 100 } }
    },
    [`create_date`]: {
      key: `create_date`,
      name: '생성일자',
      value: '',
      validate: [ { value: true, } ],
      helperText: true,
      order: 0,
      column: { type: 'text', props: { 
        width: 200,
        cellRenderer: (params: CustomCellRendererProps) => { 
          const date= parseISO(params.data.create_date)
          const str= format(date, 'yyyy-MM-dd')
          return <span>{str}</span>
        } 
      } }
    },
    [`user_id`]: {
      key: `user_id`,
      name: '아이디',
      value: 39,
      validate: [ { value: true, } ],
      helperText: true,
      order: 0,
      column: { type: 'text', props: { width: 200 } }
    },
    
    



    [`doc_01`]: {
      key: `doc_01`,
      name: '이미지',
      type: 'file',
      // defaultValue: notice_thumbs_parse,
      value: [],
      validate: [
        {
          name: 'check',
          check: ({ value, schema, wholeSchema })=> {
            let status:ValidateCheckStatus= true;
            status= value.length == 0 ? 'empty' : true;
            let totalSize= 0;
            const mimetypes = /image\/png|image\/jpeg|image\/gif|image\/svg\+xml|image\/webp/;
            if( value.length > 10 ) return { value: value, status: 'limitLen' };
            value.some( v=> {
              const { type, size }= v.file;
              const result = mimetypes.test(type);
              if( !result ) {
                status= 'ext';
                return true;
              }
              if( size > 10485760 ) status= 'limitItem';
              totalSize += size;
            });

            if( status != true ) return { value: value, status };
            if( totalSize > 104857600 ) return { value: value, status: 'limitTotal' };
            return { value: value, status };
          },
          msg: {
            ext: '잘못된 파일 형식(png, jpg, gif, svg 가능)',
            limitItem: '파일하나당 10Mb를 초과할수 없습니다.',
            limitTotal: '총파일이 100Mb를 초과할수 없습니다.',
            limitLen: '총파일수가 10개를 초과할수 없습니다.',
            empty: '',
            true: '',
            false: '2개이상 체크',
            null: '필수등록',
          },
          value: 'empty',
        }
      ],
      multiple: true,
      // range: statusSchema,
      required: true,
      helperText: true,
      thumbWidth: 94.8,
      disableFilter: true,
      uploadPath: `/${keyname}`,
      // component: <FileList />,
      component: <FileInput />,
      /* update: {
        component: <FileList />
      } */
      // order: 1
    },

    [`doc_02`]: {
      key: `doc_02`,
      name: '자료',
      type: 'file',
      // defaultValue: notice_thumbs_parse,
      value: [],
      validate: [
        {
          name: 'check',
          check: ({ value, schema, wholeSchema, status })=> {
            let valid:ValidateCheckStatus= true;
            let totalSize= 0;
            if( value.length > 10 ) return { value: value, status: 'limitLen' };
            value.some( v=> {
              const { type, size }= v.file;
              if( size > 10485760 ) valid= 'limitItem';
              totalSize += size;
            });

            if( valid != true ) return { value: value, status: valid };
            if( totalSize > 104857600 ) return { value: value, status: 'limitTotal' };
            return { value: value, status: valid };
          },
          msg: {
            ext: '잘못된 파일 형식(png, jpg, gif, svg 가능)',
            limitItem: '파일하나당 10Mb를 초과할수 없습니다.',
            limitTotal: '총파일이 100Mb를 초과할수 없습니다.',
            limitLen: '총파일수가 10개를 초과할수 없습니다.',
            empty: '',
            true: '',
            false: '2개이상 체크',
            null: '필수입력',
          },
          value: 'empty',
        }
      ],
      multiple: true,
      // range: statusSchema,
      // required: true,
      helperText: true,
      thumbWidth: 94.8,
      disableFilter: true,
      uploadPath: `/${keyname}`,
      // component: <FileList />,
      component: <FileInput />,
      // order: 1,
      /* update: {
        component: <FileList />
      } */
    },
  }
  
  const arr= Object.values(defaultValue)
  // console.log(arr)
  const sorted= _.sortBy(arr, 'order');
  // console.log(sorted)
  const sordtedColumns= {}
  sorted.map( col=> {
    sordtedColumns[col['key']]= col;
  })
  // console.log(sordtedColumns)
  
  
  /* if( override ) {
    // overrideDefault= _.merge(defaultValue, override)
    Object.keys(override).map( idx=> {
      const item= override[idx];
      Object.keys(item).map( key=> {
        // console.log(defaultValue[idx]?.[key], item[key], key)
        if( !_.has(sordtedColumns, idx) ) sordtedColumns[idx]= {}
        if( !_.has(sordtedColumns[idx], key) ) sordtedColumns[idx][key]= {}
        sordtedColumns[idx][key]= item[key];
      })
    })
  }
  let overrideDefault= sordtedColumns; */

  // setValues(sordtedColumns)
  return sordtedColumns;
}



