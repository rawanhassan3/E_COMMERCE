export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="h-40 bg-slate-200 animate-pulse rounded-3xl mb-10"></div>
        
        <div className="flex justify-between items-end mb-8">
          <div className="space-y-2">
            <div className="h-8 w-40 bg-slate-200 animate-pulse rounded-lg"></div>
            <div className="h-4 w-24 bg-slate-200 animate-pulse rounded-lg"></div>
          </div>
          <div className="h-5 w-32 bg-slate-200 animate-pulse rounded-lg"></div>
        </div>

        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white h-64 rounded-3xl border border-slate-200 animate-pulse p-6">
              <div className="flex justify-between mb-8">
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl"></div>
                  <div className="space-y-2 pt-1">
                    <div className="h-3 w-16 bg-slate-100 rounded"></div>
                    <div className="h-4 w-28 bg-slate-100 rounded"></div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="h-6 w-20 bg-slate-100 rounded-full"></div>
                  <div className="h-6 w-20 bg-slate-100 rounded-full"></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl"></div>
                  <div className="flex-1 space-y-2 pt-2">
                    <div className="h-4 w-1/2 bg-slate-50 rounded"></div>
                    <div className="h-3 w-1/4 bg-slate-50 rounded"></div>
                  </div>
                </div>
                <div className="h-12 bg-slate-50 rounded-2xl w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
