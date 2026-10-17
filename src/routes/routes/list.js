import {
	getAllRoutes,
	getListOfRegions,
	getListOfSeasons,
} from '../../models/model.js'

export default async (req, res) => {
	const regions = await getListOfRegions()
	const routes = await getAllRoutes()
	const seasons = await getListOfSeasons()
	const selectedRegion = req.query.region || ''
	const selectedSeason = req.query.season || ''

	const filteredRoutes = routes.filter((route) => {
		const regionMatch = selectedRegion
			? route.region.toLowerCase() === selectedRegion.toLowerCase()
			: true
		const seasonMatch = selectedSeason
			? route.bestSeason.toLowerCase() === selectedSeason.toLowerCase()
			: true
		return regionMatch && seasonMatch
	})

	res.render('routes/list', {
		title: 'Scenic Train Routes',
		regions: regions,
		routes: filteredRoutes,
		seasons: seasons,
		selectedRegion: selectedRegion,
		selectedSeason: selectedSeason,
	})
}
