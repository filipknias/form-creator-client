import FormCreatorArea from '@/components/app/FormCreatorArea';
import FormElementsSidebar from '@/components/app/FormElementsSidebar';
import { FormCreatorProvider } from '@/context/FormCreatorContext';
import FormProvider from '@/components/providers/FormProvider';
import DndKitProvider from '@/components/providers/DndKitProvider';

export default function CreateForm() {
  return (
      <FormProvider>
        <FormCreatorProvider>
            <DndKitProvider>
                <div className="flex bg-slate-800 h-full">
                    <div className="w-3/4 py-16 px-8">
                        <div className="h-full max-w-3xl mx-auto">
                            <FormCreatorArea />
                        </div>
                    </div>
                    <div className="w-1/4">
                        <FormElementsSidebar />
                    </div>
                </div>
            </DndKitProvider>
        </FormCreatorProvider>
    </FormProvider>
  )
}
