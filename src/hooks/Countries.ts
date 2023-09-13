import { useQuery } from "@tanstack/react-query"

function useCountries() {
    return useQuery({
        queryFn: async () => {
            const data = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,cca3,independent,population,area').then(res => res.json())
            return data
        },
        queryKey: ["countries"]
    }
    )
}

export { useCountries }