import useFetch from "@/hooks/useFetch";
import { Tv as TvType } from "@/types/tv";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Tv() {
	const params = useParams();

	const [tv, setTv] = useState<TvType | null>(null);

	const { data, isPending, error } = useFetch(`/tv/${params.id}`);

	useEffect(() => {
		setTv(data!);
	}, [data, tv, error, isPending]);

	if (error) {
		return <pre className="text-white">{error}</pre>;
	}
	if (isPending) {
		return <pre className="text-white">loading...</pre>;
	}

	return (
		<div className="text-white">
			<pre>{params.id}</pre>
			<h1>{tv?.name}</h1>
		</div>
	);
}
