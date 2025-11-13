import DinningTableIcon from "@/components/custom-ui/dinning-table-icon";
import { Card } from "@/components/ui/card";
import api from "@/lib/api-client";
import Link from "next/link";
import { TTable } from "../admin/dashboard/tables/_utils/table-schema";

export default async function Page() {
  const { data, message, success } = await api.get<TTable[]>(
    "/user-orders/tables"
  );

  if (!success) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="text-red-500 text-center">
          <p className="font-medium">Error loading tables</p>
          <p className="text-sm mt-1">{message}</p>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="text-gray-500 text-center">
          <p className="font-medium">No tables available</p>
          <p className="text-sm mt-1">Tables will appear here once created</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white px-4 py-4 border-b border-gray-200 mb-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-linear-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">R</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900">Restaurant</h1>
        </div>
      </header>

      <main className="px-4 pb-6">
        <div className="grid grid-cols-2 gap-3">
          {data.map((table) => (
            <Link key={table.id} href={`/${table.id}`} className="block">
              <Card className="overflow-hidden border border-gray-200 bg-white hover:shadow-md transition-all active:scale-[0.98] rounded-2xl">
                <div className="p-4">
                  <div className="relative h-24 w-full mb-3 bg-linear-to-br from-red-50 to-orange-50 rounded-xl flex items-center justify-center">
                    <DinningTableIcon className="w-20 h-20 text-red-500" />
                  </div>

                  <div className="text-center">
                    <h3 className="font-semibold text-gray-900 text-base">
                      {table.name}
                    </h3>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
