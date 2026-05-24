'use client'

import Link from 'next/link'
import { Dropdown, DropdownItem } from 'flowbite-react'

export type DropdownUiItem = {
    label: string
    href?: string
}

type DropdownUiProps = {
    items: DropdownUiItem[]
    label?: string
    inline?: boolean
}

function DropdownUi({ items, label, inline = true }: DropdownUiProps) {
    return (
        <Dropdown label={label} inline={inline}>
            {items?.map((item) => (
                item.href ? (
                    <DropdownItem key={item.label} as={Link} href={item.href}>
                        {item.label}
                    </DropdownItem>
                ) : (
                    <DropdownItem key={item.label}>{item.label}</DropdownItem>
                )
            ))}
        </Dropdown>
    )
}

export default DropdownUi
