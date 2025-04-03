import React, { useState } from 'react'
import s from "./Pagination.module.css";
import cn from 'classnames';
import CustomButton from '../buttons/CustomButton.tsx';


type PropsType = {
	totalUsersCount:  number
	pageSize: number 
	currentPage: number 
	onPageChanged: (pages: number) => void 
	portionSize?: number
}

const Pagination: React.FC<PropsType> = ({ totalUsersCount, pageSize, currentPage, onPageChanged, portionSize = 10 }) => {
	let pagesCount = Math.ceil(totalUsersCount / pageSize);
	let pages: Array<number> = [];
	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i);
	}

	let portionCount = Math.ceil(pagesCount / portionSize);
	let [currentPortion, setCurrentPortion] = useState(1);
	let currentLeftBorder = (currentPortion - 1) * portionSize + 1;
	let currentRightBorder = currentPortion * portionSize;

	
	return <div className={s.listPages}>
		{
			currentPortion > 1
				? <span>
					<CustomButton text='To first' onClick={() => {
						onPageChanged(pages[0])
						setCurrentPortion(1)
					}} />
					<CustomButton text='PREV' onClick={() => {
						currentPortion !== 1 && setCurrentPortion(currentPortion - 1)
					}} />
				</span>
				: null
		}

		{pages
			.filter(p => currentLeftBorder <= p && p <= currentRightBorder)
			.map(p => (
				<span style={{color:"#f35304", fontSize:"18px"}}
					key={p}
					onClick={(e) => { onPageChanged(p) }}
					className={
						cn({ [s.selectedPage]: currentPage === p }, s.pageLink)
					}> {p}
				</span>
			))
		}

		{
			currentPortion < portionCount
				? <span>
					<CustomButton text='NEXT' onClick={() => {
						currentPortion !== pagesCount && setCurrentPortion(currentPortion + 1)
					}} /> 
					<CustomButton text='To last' onClick={() => {
						onPageChanged(pages[pages.length - 1])
						setCurrentPortion(portionCount)
					}} />
				</span>
				: null
		}
	</div>
}

export default Pagination;