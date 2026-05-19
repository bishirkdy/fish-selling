import { CircleX } from 'lucide-react'
import React from 'react'
import { priceDiscounted } from '../../utils/priceDescounted'

const ViewOrderDetail = ({viewableData ,setViewDetail }) => {
  return (
     <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-3">
          <div className="w-full max-w-4xl bg-(--color-surface) border border-(--color-tertiary) rounded-2xl p-5 sm:p-7 relative no-scrollbar overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setViewDetail(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer text-xl"
            >
              <CircleX />
            </button>

            <div className="flex flex-col sm:flex-row gap-5">
              <div className="w-full sm:w-58 h-auto rounded-2xl overflow-hidden ">
                <img
                  src={viewableData?.product?.images}
                  alt={viewableData?.product?.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <h1 className="text-2xl font-bold">
                  {viewableData?.product?.name}
                </h1>
                <p className="text-gray-400 leading-relaxed">
                  {viewableData?.product?.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-sm">
                  <div className="border border-(--color-tertiary) rounded-xl p-3">
                    <p className="text-zinc-400">Quantity</p>

                    <h2 className="text-(--color-primary) font-semibold mt-1">
                      {viewableData?.quantity}
                    </h2>
                  </div>

                  <div className="border border-(--color-tertiary) rounded-xl p-3">
                    <p className="text-zinc-400">Price</p>

                    <h2 className="text-(--color-primary) font-semibold mt-1">
                      ₹
                      {priceDiscounted(
                        viewableData?.product?.price,
                        viewableData?.product?.discountPercentage,
                      )}
                    </h2>
                  </div>

                  <div className="border border-(--color-tertiary) rounded-xl p-3">
                    <p className="text-zinc-400">Payment Status</p>

                    <h2 className="text-yellow-400 font-semibold mt-1">
                      {viewableData?.paymentStatus}
                    </h2>
                  </div>

                  <div className="border border-(--color-tertiary) rounded-xl p-3">
                    <p className="text-zinc-400">Order Status</p>

                    <h2 className="text-green-400 font-semibold mt-1">
                      {viewableData?.orderStatus}
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="border border-(--color-tertiary) rounded-xl p-4">
                <p className="text-zinc-400 text-sm">Order ID</p>
                <h2 className="mt-1 break-all">{viewableData?.orderedId}</h2>
              </div>

              <div className="border border-(--color-tertiary) rounded-xl p-4">
                <p className="text-zinc-400 text-sm">Ordered Date</p>
                <h2 className="mt-1">
                  {new Date(viewableData?.orderedDate).toLocaleDateString()}
                </h2>
              </div>

              <div className="border border-(--color-tertiary) rounded-xl p-4">
                <p className="text-zinc-400 text-sm">Payment Method</p>
                <h2 className="mt-1">{viewableData?.orderMethod}</h2>
              </div>

              <div className="border border-(--color-tertiary) rounded-xl p-4">
                <p className="text-zinc-400 text-sm mb-4">Shipping Address</p>

                <div className="space-y-4 text-sm sm:text-base">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-white font-semibold text-lg">
                      {viewableData?.address?.name}
                    </h2>
                    <p className="text-zinc-300 break-all">
                      {viewableData?.address?.email}
                    </p>
                    <p className="text-zinc-300">
                      {viewableData?.address?.phone}
                    </p>
                  </div>
                  <div className="border-t border-(--color-tertiary) pt-4 text-zinc-300 leading-relaxed">
                    <p>
                      {viewableData?.address?.address?.street},{" "}
                      {viewableData?.address?.address?.post}
                    </p>
                    <p>
                      {viewableData?.address?.address?.district},{" "}
                      {viewableData?.address?.address?.state}
                    </p>
                    <p>PIN : {viewableData?.address?.address?.pincode}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default ViewOrderDetail