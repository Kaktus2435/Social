import React, { ComponentType } from "react"


export function withSuspense<WCP extends object>(Component: ComponentType<WCP>) {
	return (props: WCP) => {
		return (
			<React.Suspense fallback={'loading...'}>
				<Component {...props} />
			</React.Suspense>
		)
	}
}