export interface GSAccordionItemProps{id:string;title:React.ReactNode;content:React.ReactNode;disabled?:boolean;defaultExpanded?:boolean;}export interface GSAccordionProps{items:GSAccordionItemProps[];multiple?:boolean;defaultExpanded?:string[];onChange?:(expanded:string[])=>void;variant?:'outlined'|'soft'|'plain';size?:'sm'|'md'|'lg';className?:string;debug?:boolean;}

