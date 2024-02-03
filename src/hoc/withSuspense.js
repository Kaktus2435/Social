import React from "react"


export const withSuspense = (Component) => (props) => {
	return (
		<React.Suspense fallback={'loading...'}>
			<Component {...props} />
		</React.Suspense>
	)
}