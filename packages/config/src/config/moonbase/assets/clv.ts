import { Asset, Chain } from '../../../constants';
import { XTokensExtrinsicSuccessEvent } from '../../../extrinsic';
import {
  assets,
  balance,
  chains,
  extrinsic,
  withdraw,
} from '../moonbase.common';
import { MoonbaseXcmConfig } from '../moonbase.interfaces';

const asset = assets[Asset.CLV];
const origin = chains[Chain.CloverAlphanet];

export const CLV: MoonbaseXcmConfig = <const>{
  asset,
  origin,
  deposit: {
    [origin.chain]: {
      origin,
      balance: balance.system(),
      extrinsic: extrinsic
        .xTokens()
        .transfer()
        .successEvent(XTokensExtrinsicSuccessEvent.TransferredMultiAssets)
        .origin(origin)
        .asset('SelfReserve'),
    },
  },
  withdraw: {
    [origin.chain]: withdraw.xTokens({
      balance: balance.system(),
      destination: origin,
      feePerWeight: 10_000,
    }),
  },
};