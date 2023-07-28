import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Text,
  DataTable
} from "@shopify/polaris";
import axios from 'axios'
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation, Trans } from "react-i18next";
import { useEffect, useState } from "react";

// import { trophyImage } from "../assets";

// import { ProductsCard } from "../components";

// export default function HomePage() {
//   const { t } = useTranslation();
//   return (
//     <Page narrowWidth>
//       <TitleBar title={t("HomePage.title")} primaryAction={null} />
//       <Layout>
//         <Layout.Section>
//           <Card sectioned>
//             <Stack
//               wrap={false}
//               spacing="extraTight"
//               distribution="trailing"
//               alignment="center"
//             >
//               <Stack.Item fill>
//                 <TextContainer spacing="loose">
//                   <Text as="h2" variant="headingMd">
//                     {t("HomePage.heading")}
//                   </Text>
//                   <p>
//                     <Trans
//                       i18nKey="HomePage.yourAppIsReadyToExplore"
//                       components={{
//                         PolarisLink: (
//                           <Link url="https://polaris.shopify.com/" external />
//                         ),
//                         AdminApiLink: (
//                           <Link
//                             url="https://shopify.dev/api/admin-graphql"
//                             external
//                           />
//                         ),
//                         AppBridgeLink: (
//                           <Link
//                             url="https://shopify.dev/apps/tools/app-bridge"
//                             external
//                           />
//                         ),
//                       }}
//                     />
//                   </p>
//                   <p>{t("HomePage.startPopulatingYourApp")}</p>
//                   <p>
//                     <Trans
//                       i18nKey="HomePage.learnMore"
//                       components={{
//                         ShopifyTutorialLink: (
//                           <Link
//                             url="https://shopify.dev/apps/getting-started/add-functionality"
//                             external
//                           />
//                         ),
//                       }}
//                     />
//                   </p>
//                 </TextContainer>
//               </Stack.Item>
//               <Stack.Item>
//                 <div style={{ padding: "0 20px" }}>
//                   <Image
//                     source={trophyImage}
//                     alt={t("HomePage.trophyAltText")}
//                     width={120}
//                   />
//                 </div>
//               </Stack.Item>
//             </Stack>
//           </Card>
//         </Layout.Section>
//         <Layout.Section>
//           <ProductsCard />
//         </Layout.Section>
//       </Layout>
//     </Page>
//   );
// }

function HomePage() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get('/api/products/count')
    .then(res => {
      setProducts(res.data.products);
    })
    .catch(err => {
      console.error(err);
    })
  })
  const tableData = [
    ['Product one', '3 in stock', '100', 'Shop name'],
    ['Product two', '5 in stock', '300', 'Shop name'],
    ['Product three', '7 in stock', '150', 'Shop name'],
  ]
  return (
    <Page>
      <TitleBar title="Products List"/>
      <DataTable 
        columnContentTypes={['text', 'text', 'text']}
        headings={['Product', 'Stock', 'Price', 'Vendor']}
        rows={tableData}
      />
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <h3>{product.title}</h3>
            <p>Price: {product.variants[0].price}</p>
            {/* Add other product details you want to display */}
          </li>
        ))}
      </ul>
    </Page>
  )
}
