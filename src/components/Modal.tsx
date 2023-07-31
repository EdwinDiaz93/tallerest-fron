
const Modal = ({ children }: any) => {

    return (
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 ">
            <div className="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white">
                <div className="w-full">
                    <div className="m-4 max-w-[400px] mx-auto">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Modal