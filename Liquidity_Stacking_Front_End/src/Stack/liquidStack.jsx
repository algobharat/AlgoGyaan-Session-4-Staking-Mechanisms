import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";

export default function Stack() {
  const [selectBtn, setSelectBtn] = useState("");
  const [info, setInfo] = useState("");
  const [addLiquidityInfo, setAddLiquidityInfo] = useState(null);
  const [removeLiquidityInfo, setRemoveLiquidityInfo] = useState(null);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const url = "http://192.168.31.96:7777";

  const information = async (btnselected) => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/${btnselected}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      if (btnselected === "generate_Account") {
        setSelectBtn("Generate Account");
      } else if (btnselected === "create_Asset") {
        setSelectBtn("Create Asset");
      } else if (btnselected === "bootstrap_Pool") {
        setSelectBtn("Bootstrap Pool");
      } else if (btnselected === "add_Liquidity") {
        setSelectBtn("Add Liquidity");
        setAddLiquidityInfo(data);
      } else if (btnselected === "remove_Liquidity") {
        setSelectBtn("Remove Liquidity");
        setRemoveLiquidityInfo(data);
      } else {
        setSelectBtn("Unknown Action");
      }
      setInfo(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setInfo({ error: "Failed to fetch data. Please try again later." });
    }finally {
      setLoading(false);  
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const compareLiquidityData = () => {
    if (addLiquidityInfo && removeLiquidityInfo) {
      const addLiquidityQuote = addLiquidityInfo["Liquidity Quote"];
      const removeAssets = removeLiquidityInfo["Assets"];

      let impact = [];

      // Extracting amounts for assets and pool tokens for comparison
      const addedAsset1 = parseFloat(addLiquidityQuote.match(/Asset 1\('(\d+\.\d+)'/)[1]);
      const addedAsset2 = parseFloat(addLiquidityQuote.match(/Asset 2\('(\d+\.\d+)'/)[1]);
      const removedAsset1 = removeAssets.find((a) => a.asset.name === "Asset 1")?.amount / 1000000;
      const removedAsset2 = removeAssets.find((a) => a.asset.name === "Asset 2")?.amount / 1000000;
      const removedPoolTokens = removeLiquidityInfo["Pool Tokens"]?.amount / 1000000;

      // Compare asset amounts added vs removed
      if (addedAsset1 !== removedAsset1) {
        impact.push(
          <p key="asset1-impact">
            <Typography variant="h6" color="primary" gutterBottom>Compair Impacted Liquidity</Typography>
            <strong>Asset 1 Impact:</strong> Added - {addedAsset1} vs Removed - {removedAsset1}
          </p>
        );
      }

      if (addedAsset2 !== removedAsset2) {
        impact.push(
          <p key="asset2-impact">
            <strong>Asset 2 Impact:</strong> Added - {addedAsset2} vs Removed - {removedAsset2}
          </p>
        );
      }

      // Compare pool tokens (assuming same unit for both)
      const poolTokenImpact = addedAsset1 + addedAsset2 - removedPoolTokens; // Example calculation
      impact.push(
        <p key="pool-token-impact">
          <strong>Pool Tokens Impact:</strong> Added - {addedAsset1 + addedAsset2} vs Removed - {removedPoolTokens}
          (Difference: {poolTokenImpact})
        </p>
      );

      if (impact.length === 0) {
        return <p>No significant impact between adding and removing liquidity.</p>;
      }
      return impact;
    }
    return <p>Data for both add and remove liquidity is required to compare.</p>;
  };

  const renderAccountInfo = (accountData) => (
    <div container spacing={2}>
      <div item xs={12}>
        <Paper sx={{ padding: "10px", backgroundColor: "#f4f6f8", borderRadius: "8px" }}>
          <Typography variant="body1"><strong>Address:</strong> {accountData.address}</Typography>
          <Typography variant="body1"><strong>Mnemonic:</strong> {accountData.mnemonic}</Typography>
          <Typography variant="body1"><strong>Private Key:</strong> {accountData.private_key}</Typography>
        </Paper>
      </div>
      <div item xs={12}>
        <Typography variant="body2" color="textSecondary">Fund Account:</Typography>
        <Typography variant="body2" component="a" href={`https://bank.testnet.algorand.network/?account=${accountData.address}`} target="_blank" rel="noopener noreferrer" color="primary">
          Go to the bank to fund your account
        </Typography>
      </div>
    </div>
  );

  const renderAssets = (assetsData) => (
  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
    {assetsData.map((asset, index) => (
      <Box key={index} sx={{ flex: '1 1 calc(50% - 16px)', maxWidth: 'calc(50% - 16px)' }}>
        <Card sx={{ padding: "15px", backgroundColor: "#f4f6f8", borderRadius: "8px" }}>
          <CardContent>
            <Typography variant="h6" sx={{ textDecoration: "underline" }}>
              {asset.asset.name}
            </Typography>
            <Typography variant="body1"><strong>Amount:</strong> {asset.amount}</Typography>
            <Typography variant="body1"><strong>Unit:</strong> {asset.asset.unit_name}</Typography>
            <Typography variant="body1"><strong>ID:</strong> {asset.asset.id}</Typography>
            <Typography variant="body1"><strong>Decimals:</strong> {asset.asset.decimals}</Typography>
          </CardContent>
        </Card>
      </Box>
    ))}
  </Box>
);

  const renderPoolInfo = (poolData) => (
    <div container spacing={2}>
      <div item xs={12}>
        <Paper sx={{ padding: "10px", backgroundColor: "#f4f6f8", borderRadius: "8px" }}>
          <Typography margin={"12px"} variant="body1"><strong>Pool ID:</strong> {poolData}</Typography>
        </Paper>
      </div>
    </div>
  );

  const renderLiquidityQuote = (liquidityQuote) => (
    <div container spacing={2}>
      <div item xs={12}>
        <Paper sx={{ padding: "10px", backgroundColor: "#f4f6f8", borderRadius: "8px" }}>
          <Typography margin={"12px"} variant="body1">{liquidityQuote}</Typography>
        </Paper>
      </div>
    </div>
  );

  const renderPoolTokens = (tokensData) => (
    <div container spacing={2}>
      <div item xs={12}>
        <Typography variant="h6" color="primary" gutterBottom>Pool Tokens</Typography>
        <Paper sx={{ padding: "10px", backgroundColor: "#f4f6f8", borderRadius: "8px" }}>
          <Typography variant="body1"><strong>Amount:</strong> {tokensData.amount}</Typography>
          <Typography variant="body1"><strong>Asset Name:</strong> {tokensData.asset.name}</Typography>
        </Paper>
      </div>
    </div>
  );

  const renderShareOfPool = (share) => (
    <div container spacing={2}>
      <div item xs={12}>
        <Typography variant="h6" color="primary" gutterBottom>Share of Pool</Typography>
        <Paper sx={{ padding: "10px", backgroundColor: "#f4f6f8", borderRadius: "8px" }}>
          <Typography variant="body1"><strong>Share:</strong> {share}</Typography>
        </Paper>
      </div>
    </div>
  );

  const renderInfo = () => {
    if (loading) {
      return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
          <CircularProgress />
        </Box>
      );
    }

    if (!info) return <Typography variant="body1" color="textSecondary">No information available</Typography>;

    if (info["Account created"]) {
      return renderAccountInfo(info["Account created"]);
    }
    if (info["Generated Assets"]) {
      return (
        <>
          {info["Generated Assets"].map((assetId, index) => (
            <Chip key={index} label={`Asset ID: ${assetId}`}  sx={{ marginRight: "10px", marginBottom: "10px" }} />
          ))}
        </>
      );
    }
    if (info["Created Pool"]) {
      return renderPoolInfo(info["Created Pool"]);
    }
    if (info["Liquidity Quote"]) {
      return renderLiquidityQuote(info["Liquidity Quote"]);
    }
    if (info["Assets"]) {
      return renderAssets(info["Assets"]);
    }
    if (info["Pool Tokens"]) {
      return renderPoolTokens(info["Pool Tokens"]);
    }
    if (info["Share of Pool"]) {
      return renderShareOfPool(info["Share of Pool"]);
    }
    return <Typography variant="body1" color="textSecondary">Unknown data format</Typography>;
  };

  return (
    <>
      <Tabs value={value} onChange={handleChange} variant="fullWidth" centered>
        <Tab label="Account" sx={{borderRight: "1px solid #C0C0C0"}} onClick={() => information("generate_Account")} />
        <Tab label="Asset"  sx={{borderRight: "1px solid #C0C0C0"}}onClick={() => information("create_Asset")} />
        <Tab label="Pool"  sx={{borderRight: "1px solid #C0C0C0"}}onClick={() => information("bootstrap_Pool")} />
        <Tab label="Add Liquidity"  sx={{borderRight: "1px solid #C0C0C0"}}onClick={() => information("add_Liquidity")} />
        <Tab label="Remove Liquidity" onClick={() => information("remove_Liquidity")} />
      </Tabs>
      <div
        style={{
          margin: "20px",
          padding: "20px",
          border: "1px solid #C0C0C0",
          borderRadius: "10px",
          wordWrap: "break-word",
          overflowWrap: "break-word",
          maxWidth: "100%", 
          overflowX: "auto",
          boxSizing: "border-box", 
        }}
      >
      <Box sx={{ padding: "20px",marginLeft:"30px",marginRight:"30px", backgroundColor: "#fafafa", borderRadius: "8px" }}>
        {!loading && (
          <Typography variant="h6" color="primary" gutterBottom>{selectBtn}</Typography>
        )}
        {renderInfo()}
        {selectBtn === "Remove Liquidity" && compareLiquidityData()}
      </Box>
      </div>
    </>
  );
}
