import {
    Compiler, Component, NgModule, ComponentFactory, Injectable, ViewContainerRef,
    ComponentRef
} from "@angular/core";
import {CommonModule} from "@angular/common";

@Injectable()
export class CompilerService {
    constructor(private compiler: Compiler) {
    }

    async injectTemplate(location: ViewContainerRef, template: string, state?: object): Promise<ComponentRef<any>> {
        const componentFactory = await this.compileTemplate("<h1>{{state.counter}}</h1>");

        const componentRef = location.createComponent(componentFactory);

        console.log(componentRef.instance);

        if(state) {
            componentRef.instance.state = state;
        }

        return componentRef;
    }

    compileTemplate(template: string): Promise<ComponentFactory<any>> {
        @Component({
            template: template,
        })
        class MyComponent {
        }

        @NgModule({
            imports: [
                CommonModule
            ],
            declarations: [
                MyComponent
            ]
        })
        class MyModule {
        }

        return this.compiler.compileModuleAndAllComponentsAsync(MyModule).then(module => {
            const cf: ComponentFactory<any> = module.componentFactories.find(cf => cf.componentType == MyComponent);
            if(!cf) {
                throw new Error("Compiled component factory was not found");
            }

            return cf;
        });
    }
}
