import React from 'react';
import { MoreBarSkeletonBox } from '../../../styles/common/BarsStyle';

function MoreBarSkeleton(props) {
    return (
        <MoreBarSkeletonBox>
            <div></div>
            <div></div>
        </MoreBarSkeletonBox>
    );
}

export default MoreBarSkeleton;