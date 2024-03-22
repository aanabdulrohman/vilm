import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import type { MovieTv, Response } from "@/types/response";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import CardItem from "@/components/CardItem";

export default function Search() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	const queryTitle = searchParams.get("title");
	const queryType = searchParams.get("type");

	const [results, setResults] = useState<MovieTv[]>([]);
	const [title, setTitle] = useState<string>(queryTitle ?? "");
	const [type, setType] = useState<string>(queryType ?? "movie");

	const { data } = useFetch<Response<MovieTv[]>>(
		`/search/${queryType}?query=${queryTitle}`
	);

	const handleSearch = async (e: FormEvent) => {
		e.preventDefault();

		navigate({
			pathname: "/search",
			search: `?title=${title}&type=${type}`,
		});
	};

	useEffect(() => {
		if (!queryTitle && !queryType) {
			navigate("/");
		}

		setType(queryType!);
		setTitle(queryTitle!);
		setResults(data?.results as MovieTv[]);
	}, [data, navigate, queryTitle, queryType, results]);
	return (
		<div>
			<form
				onSubmit={handleSearch}
				className="grid md:grid-cols-4 grid-cols-1 px-4 max-w-4xl mx-auto gap-2 mt-5 text-white"
			>
				<Input
					type="text"
					value={title}
					className="bg-slate-800 text-white md:col-span-3 col-span-1"
					onChange={(e) => setTitle(e.target.value)}
				/>
				<Select value={type} onValueChange={(value) => setType(value)}>
					<SelectTrigger className="w-[180px] col-span-1 bg-slate-800">
						<SelectValue placeholder="Select Media Type " />
					</SelectTrigger>
					<SelectContent className="bg-slate-800 text-white">
						<SelectGroup>
							<SelectItem className=" hover:bg-slate-600" value="movie">
								Movie
							</SelectItem>
							<SelectItem className=" hover:bg-slate-600" value="tv">
								Tv
							</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</form>
			<div className="grid lg:grid-cols-8 md:grid-cols-4 grid-cols-2 gap-5  mx-auto px-5 mt-5">
				{!!results?.length &&
					results?.map((movie: MovieTv) => (
						<CardItem media={queryType!} movie={movie} key={movie.id} />
					))}
				{/* Fallback if results is null */}
			</div>
		</div>
	);
}