// ./schema/recommendation/RecommendationItem.tsx

import {ObjectItemProps, PatchEvent, set, useFormValue} from 'sanity'
import {useDocumentPane} from 'sanity/desk'
import {useCallback, default as React} from 'react'
import {Box, Flex, Switch} from '@sanity/ui'
import type {Job} from "../job";

export function JobPreview(props: ObjectItemProps<Job>) {
    const {value, path} = props

    // Item props don't have `onChange`, but we can get it from useDocumentPane()
    // This hook is currently marked internal – be aware that this can break in
    // future Studio updates
    const {onChange} = useDocumentPane()

    const handleClick = useCallback(() => {
        const nextValue = value?.active ? false : true
        const clickedFeaturedPath = [...path, 'active']


        // Because onChange came from useDocumentPane
        // we need to wrap it in a PatchEvent
        // and supply the path to the field
        onChange(
            PatchEvent.from([
                // Update this field
                set(nextValue, clickedFeaturedPath),
                // Maybe update other fields
            ])
        )
    }, [value?.active, value?._key, path, onChange])


    return (
        <Flex gap={3} paddingLeft={2} align="center">
            <Switch checked={value?.active} onClick={handleClick} />
            <Box flex={1}>{props.renderDefault(props)}</Box>
        </Flex>
    )
}
