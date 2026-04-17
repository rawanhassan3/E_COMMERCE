export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50">
      <div className="h-[73px] bg-white border-b border-slate-200"></div>
      <div className="bg-white border-b border-slate-200 py-12 md:py-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="w-48 h-4 bg-slate-200 rounded animate-pulse mb-4"></div>
          <div className="w-64 h-12 bg-slate-200 rounded-lg animate-pulse"></div>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto w-full px-4 md:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          <main className="flex-1 min-w-0">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="aspect-square bg-white border border-slate-200 rounded-3xl animate-pulse"></div>
                <div className="space-y-6">
                   <div className="w-32 h-4 bg-slate-200 rounded"></div>
                   <div className="w-3/4 h-10 bg-slate-200 rounded"></div>
                   <div className="w-full h-32 bg-slate-100 rounded-2xl"></div>
                </div>
             </div>
          </main>
        </div>
      </div>
    </div>
  );
}
