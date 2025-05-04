import { Suspense } from "react"
import ProductSheet from "@/components/ProductSheet"
import ProductSheetSkeleton from "@/components/ProductSheetSkeleton"

export default function ProductSheetPage({
  params,
}: {
  params: { slug: string }
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<ProductSheetSkeleton />}>
        <ProductSheet slug={params.slug} />
      </Suspense>
    </div>
  )
}
