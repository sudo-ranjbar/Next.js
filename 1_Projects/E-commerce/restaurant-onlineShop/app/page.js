import About from "@/components/About";
import Contact from "@/components/contact/Contact";
import Features from "@/components/layouts/Features";
import ProductTabs from "@/components/products/ProductTabs";
import { getFetch } from "@/utils/fetch";


export default async function Home() {

	const productTabs = await getFetch("/products/products-tabs")


	return (
		<>
			<Features />
			<ProductTabs tabList={productTabs.tabList} tabPanel={productTabs.tabPanel} />
			<About />
			<Contact />
		</>
	);
}
