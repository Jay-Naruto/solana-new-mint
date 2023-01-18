import dynamic from "next/dynamic";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useProgram,useClaimNFT,useProgramMetadata,useClaimConditions } from "@thirdweb-dev/react/solana"
// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);
const Home = () => {
  // Here's how to get the thirdweb SDK instance
  // const sdk = useSDK();
  // Here's how to get a nft collection
  // const { data: program } = useProgram(
  //   your_nft_collection_address,
  //   "nft-collection"
  // );
  const { program } = useProgram("E2JQdX2AQKcYdyxkom5AgKwPrh6W15ntAuc8uhMCXoak", "nft-drop")
  const {data:metadata, isLoading:metadataisLoading}=useProgramMetadata(program)
  const {data:conditions, isLoading:conditionsisLoading}=useClaimConditions(program)

  const { mutateAsync: claim, isLoading, error } = useClaimNFT(program);
  return (
    <>
      <div className={styles.container}>


     
        <div className={styles.iconContainer}>
          {/* <Image
            src="/thirdweb.svg"
            height={75}
            width={115}
            style={{
              objectFit: "contain",
            }}
            alt="thirdweb"
          /> */}
          <img
            width={200}
            height={200}
            src="#.png"
            className={styles.icon}
            alt="NFT image"
          />
        </div>
        <h1 className={styles.h1}>{metadata ? metadata.name:null}</h1>
        <div className={styles.explain}>
          {metadata ? metadata.description:null}
        </div>

        <WalletMultiButtonDynamic />
        <button disabled={isLoading} className={styles.minting}  onClick={() => claim({amount: 1})}>
       { !conditionsisLoading ?  "MINT":"MINTING" }
    </button>
    {/* <p className={styles.explain}>
          {conditions ? conditions.price.value :null}
        </p> */}
    <p className={styles.explain}>
         CLAIMED BY YOU: {conditions ? conditions.claimedSupply:null}/{conditions ? conditions.totalAvailableSupply:null}
        </p>
           </div>
 
    </>
  );
};

export default Home;
