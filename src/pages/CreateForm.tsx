import FormCreatorArea from '@/components/app/FormCreatorArea';
import FormElementsSidebar from '@/components/app/FormElementsSidebar';
import FormCreatorToolbar from '@/components/app/FormCreatorToolbar';
import FormProvider from '@/components/providers/FormProvider';
import DndKitProvider from '@/components/providers/DndKitProvider';
import { FormCreatorProvider } from '@/context/FormCreatorContext';

export default function CreateForm() {
  return (
      <FormProvider>
        <FormCreatorProvider>
            <DndKitProvider>
                <div className="flex flex-col h-screen">
                    <FormCreatorToolbar />
                    <div className="flex bg-slate-800 h-full">
                        <div className="flex-1 py-16 px-8">
                            <div className="h-full max-w-3xl mx-auto">
                                <FormCreatorArea />
                            </div>
                        </div>
                        <div className="max-w-md">
                            <FormElementsSidebar />
                        </div>
                    </div>
                </div>
            </DndKitProvider>
        </FormCreatorProvider>
    </FormProvider>
  )
}
