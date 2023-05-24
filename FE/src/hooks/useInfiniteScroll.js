import { useEffect, useState } from "react";

export default function useInfiniteScroll(id, api, size, init, isRefetching) {
	const [page, setPage] = useState(0);
	const [data, setData] = useState([]);
	const [isFetching, setFetching] = useState(false);
	const [hasNextPage, setNextPage] = useState(true);
	const [isReviewed, setIsReviewed] = useState(false);

	const apiCall = async (isRefetching) => {
		// const apiCall = useCallback( async (isRefetching) => {
		return (async () => {
			const result = await api(id, isRefetching ? size * page : size, isRefetching ? 0 : page)
				.then(init)
				.then((res) => {
					isRefetching ? setData(res?.contents) : setData(data.concat(res?.contents));
					setNextPage(res?.hasNextPage);
					setFetching(false);

					// 리뷰 조회 시 리뷰 작성 여부 
					setIsReviewed(res?.isReviewed);

					return isRefetching ? res?.contents : data.concat(res?.contents);
				});

			isRefetching ? setPage(1) : setPage(page + 1);

			return result;
		})();
	};
	// },[page]);

	useEffect(() => {
		const handleScroll = () => {
			const { scrollTop, offsetHeight } = document.documentElement;
			if (window.innerHeight + scrollTop + 0.5 >= offsetHeight) {
				setFetching(true);
			}
		};

		setFetching(true);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		if (isFetching && hasNextPage) apiCall();
		else if (!hasNextPage) setFetching(false);
	}, [isFetching]);

	return { page, data, isFetching, hasNextPage, isReviewed, apiCall };
}
