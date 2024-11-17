import { ToastContainer, toast, cssTransition, Id, ToastOptions } from 'react-toastify';
import Button from './Button';
import { MouseEvent } from 'react';

interface MsgProp {
  text: string
  children: React.ReactNode
}

const Msg = ({ text, children }:MsgProp)=> (<div className="flex flex-col">
    <span className="font-suite text-sm font-bold">{text}</span>
    {children && children}
  </div>
)

interface ConfirmProp {
  text: string
  agree: (e:MouseEvent<HTMLButtonElement> | undefined)=> void
  disagree: (e:MouseEvent<HTMLButtonElement> | undefined)=> void
}
const Confirm = ({ text, agree, disagree }:ConfirmProp) => (
  <Msg text={text} >
    <div className="flex gap-2 items-center justify-center mt-2">
      <Button size="sm" className="bg-main" onClick={agree}>네</Button>
      <Button size="sm" className="bg-main" onClick={disagree}>아니오</Button>
    </div>
  </Msg>
);


export const toasterConfirm = (myProps, toastProps:ToastOptions): Id =>
  toast(<Confirm {...myProps} />, { ...toastProps });

export const toaster = (myProps, toastProps:ToastOptions): Id => toast(<Msg {...myProps} />, { ...toastProps });
toaster.success  = (myProps, toastProps:ToastOptions): Id => toast.success(<Msg {...myProps} />, { ...toastProps });
toaster.error = (myProps, toastProps:ToastOptions): Id => toast.error(<Msg {...myProps} />, { ...toastProps });
toaster.warn = (myProps, toastProps:ToastOptions): Id => toast.warn(<Msg {...myProps} />, { ...toastProps });
toaster.info = (myProps, toastProps:ToastOptions): Id => toast.info(<Msg {...myProps} />, { ...toastProps });
toaster.loading = (myProps, toastProps:ToastOptions): Id => toast.loading(<Msg {...myProps} />, { ...toastProps });
toaster.update = (id, myProps, toastProps) => toast.update(id, { 
  render: <Msg {...myProps} />, closeButton: true, 
  ...toastProps 
});